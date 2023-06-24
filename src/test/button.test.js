import React from 'react'
import {Button} from '../pages/login'
import {render, screen, cleanup, waitFor} from "@testing-library/react"
import '@testing-library/jest-dom'

test("Should render proper text", ()=>{
    render(<Button text="Mine"/>)

    const buttonElement = screen.getByTestId("button")
    expect(buttonElement).toHaveTextContent("Mine")
})