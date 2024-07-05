import * as React from 'react'
import { createFileRoute, getRouteApi, useRouter, useSearch } from '@tanstack/react-router'

import { z } from 'zod'

const messageSearchSchema = z.object({
    page: z.number().catch(1),
})

export const Route = createFileRoute('/about')({
    component: AboutComponent,
    validateSearch: messageSearchSchema,
    onStay: (match) => {
        console.log('onStay page number', match.search.page)
    },
})

function AboutComponent() {
    const router = useRouter()
    const routeApi = getRouteApi('/about')
    const { page } = routeApi.useSearch()

    const handleButtonClick = (pageNumber: number) => {
        router.navigate({ search: { page: pageNumber }, replace: true })
    }

    return (
        <div className="p-2">
            <h3>About</h3>
            <p>Current page: {page}</p>
            <button onClick={() => handleButtonClick(page + 1)}>Go to next page</button>
        </div>
    )
}
