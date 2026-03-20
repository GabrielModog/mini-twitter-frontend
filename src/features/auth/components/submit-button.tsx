export interface SubmitButtonProps {
  isSubmitting: boolean
}

export default function SubmitButton(props: SubmitButtonProps) {
  const { isSubmitting } = props
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full h-14 text-white py-3 bg-sky-500 hover:bg-sky-700 rounded-4xl font-medium transition disabled:opacity-60 cursor-pointer shadow-lg shadow-blue-200"
    >
      {isSubmitting ? 'Fazendo Login...' : 'Continuar'}
    </button>
  )
}