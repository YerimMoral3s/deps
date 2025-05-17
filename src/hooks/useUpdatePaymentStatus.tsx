import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../api/axios";
import axios from "axios";
import {
  Payment,
  PaymentStatusResponse,
  postUpdatePaymentStatus,
  UpdatePaymentStatus,
} from "../api/Leases";
import { paymentsQueryKeys } from "./useGetTenantPayments";

type UseUpdatePaymentStatusResult = UseMutationResult<
  ApiResponse<PaymentStatusResponse>,
  ApiError,
  UpdatePaymentStatus,
  { previousPayments: ApiResponse<Payment[]> }
>;

type UseUpdatePaymentStatusOptions = UseMutationOptions<
  ApiResponse<PaymentStatusResponse>,
  ApiError,
  UpdatePaymentStatus,
  { previousPayments: ApiResponse<Payment[]> }
>;

export const useUpdatePaymentStatus = (
  tenantId: number,
  options?: UseUpdatePaymentStatusOptions
): UseUpdatePaymentStatusResult => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<PaymentStatusResponse>,
    ApiError,
    UpdatePaymentStatus,
    { previousPayments: ApiResponse<Payment[]> }
  >({
    mutationFn: postUpdatePaymentStatus,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onMutate: async ({
      payment_id,
      status,
    }): Promise<{ previousPayments: ApiResponse<Payment[]> } | undefined> => {
      await queryClient.cancelQueries({
        queryKey: paymentsQueryKeys.getPayments(tenantId),
      });

      const previousPayments = queryClient.getQueryData<ApiResponse<Payment[]>>(
        paymentsQueryKeys.getPayments(tenantId)
      );

      if (!previousPayments) {
        return undefined;
      }

      const updatedPayments = previousPayments.data.map((p) =>
        p.id === payment_id ? { ...p, status } : p
      );

      queryClient.setQueryData(paymentsQueryKeys.getPayments(tenantId), {
        ...previousPayments,
        data: updatedPayments,
      });

      return { previousPayments };
    },

    onError: (error, variables, context) => {
      console.error("❌ Error updating payment status:", error);

      if (context?.previousPayments) {
        queryClient.setQueryData(
          paymentsQueryKeys.getPayments(tenantId),
          context.previousPayments
        );
      }

      let errorMessage: ApiError = {
        success: false,
        message: "An unexpected error occurred.",
      };

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data;
      }

      options?.onError?.(errorMessage, variables, context);
    },

    // onSettled: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: paymentsQueryKeys.getPayments(tenantId),
    //   });
    // },
  });
};
