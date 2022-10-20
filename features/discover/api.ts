import {
  DiscoverApiErrors,
  DiscoverFiltersSettings,
  DiscoverTableRowData,
} from 'features/discover/types'
import { useObservable } from 'helpers/observableHook'
import { stringify } from 'querystring'
import { of } from 'ramda'
import { useMemo } from 'react'
import { Observable } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { catchError, map } from 'rxjs/operators'

export interface DiscoverDataErrorResponse {
  code: DiscoverApiErrors
}

export interface DiscoverDataResponse {
  rows?: DiscoverTableRowData[]
  error?: DiscoverDataErrorResponse
}

function getDiscoverData$(endpoint: string, query: string): Observable<DiscoverDataResponse> {
  return ajax({
    url: `${endpoint}?${query}`,
    method: 'GET',
  }).pipe(
    map(({ response }) => response),
    catchError(({ response }) => of(response)),
  )
}

export function getDiscoverData(endpoint: string, settings: DiscoverFiltersSettings) {
  const discoverData$ = useMemo(() => getDiscoverData$(endpoint, stringify(settings)), [
    endpoint,
    settings,
  ])
  const [discoverData] = useObservable(discoverData$)

  return discoverData
}
