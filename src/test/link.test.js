import React from "react";
import {render, screen, cleanup} from "@testing-library/react"
import {LinkComp} from "../pages/dashboard" ;
import '@testing-library/jest-dom'

test('Should render List COmponent', () => {
    let data={
        _id:1,
        title:"Title",
        desc:"desc"
    }
    render(<LinkComp link={data}/>)
    const LinkElement = screen.getByTestId('link-1')
    expect(LinkElement).toBeInTheDocument();
    expect(LinkElement).toHaveTextContent("Title")
  });