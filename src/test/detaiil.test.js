import React from "react";
import {render, screen, cleanup, waitFor} from "@testing-library/react"
import {LinkComp} from "../pages/dashboard" ;
import axios from "axios";
import '@testing-library/jest-dom'

jest.mock("axios")



test('Should render List COmponent array API', async () => {
    let dummyData=[
        {
            _id:1,
            title:"Title1",
            desc:"desc"
        },
        {
            _id:3,
            title:"Title3",
            desc:"desc"
        },
        {
            _id:2,
            title:"Titl2e",
            desc:"desc"
        }
    ]
    axios.get.mockResolvedValue({data:dummyData})
    render(
        <div>
            <LinkComp link={dummyData[0]}/>
            <LinkComp link={dummyData[1]}/>
            <LinkComp link={dummyData[2]}/>
        </div>
    )

    const linkList = await waitFor(() => screen.findAllByTestId("link-1"));
    const linkList1 = await waitFor(() => screen.findAllByTestId("link-2"));
    const linkList2 = await waitFor(() => screen.findAllByTestId("link-3"));
    

    expect(linkList).toHaveLength(1);
    expect(linkList1).toHaveLength(1);
    expect(linkList2).toHaveLength(1);
    // const LinkElement = screen.getByTestId('link-1')
    // expect(LinkElement).toBeInTheDocument();
    // expect(LinkElement).toHaveTextContent("Title")
  });