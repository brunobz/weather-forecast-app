import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface InputFormProps {
  isLoading: boolean;
  onSubmit: (address: string) => void;
}

const schema = z.object({
  address: z.string().min(5, "Please enter a valid address."),
});

type FormData = z.infer<typeof schema>;

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data.address.trim());
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow space-y-4"
      aria-label="Address input form"
    >
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Enter Address
        </label>
        <input
          id="address"
          type="text"
          placeholder="1360 S Blue Island Ave, Chicago, IL"
          aria-invalid={!!errors.address}
          aria-describedby="address-error"
          autoFocus
          disabled={isLoading}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("address")}
        />
        {errors.address && (
          <p
            id="address-error"
            role="alert"
            className="mt-1 text-sm text-red-600"
          >
            {errors.address.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md 
             hover:bg-blue-700 transition 
             disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        Get Forecast
      </button>
    </form>
  );
}
