import { act, render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import AuthPage from "../../../features/auth/pages/auth-page"

import "@testing-library/jest-dom"

describe("Auth Page Component - Página Padrão", () => {
  it("deve aparece o campo de login ao iniciar a página", () => {
    const page = render(<AuthPage />)

    const loginLabel = page.getByText(/e-mail/i)

    expect(loginLabel).toBeInTheDocument()
  })

  it("deve aparece o campo de cadastro ao iniciar a página", () => {
    const page = render(<AuthPage />)

    const cadastrarAbaBtn = page.getByText(/cadastrar/i)

    expect(cadastrarAbaBtn).toBeInTheDocument()

    act(() => {
      cadastrarAbaBtn.click()
    })

    const nomeLabel = page.getByText(/nome/i)

    expect(nomeLabel).toBeInTheDocument()
  })
})