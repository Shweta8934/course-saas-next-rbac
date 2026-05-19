import { FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
  [key: string]: unknown
}

export function useFormState<TState extends FormState>(
  action: (data: FormData) => Promise<TState>,
  onSuccess?: (state: TState) => Promise<void> | void,
  initialState?: TState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, errors: null },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success) {
        if (onSuccess) {
          await onSuccess(state)
        }
        requestFormReset(form)
      }

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
