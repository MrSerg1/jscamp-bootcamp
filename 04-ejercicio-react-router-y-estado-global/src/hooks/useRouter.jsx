import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router'

export function useRouter() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const params = useParams()
  const query  = useSearchParams()

  function navigateTo(path) {
    navigate(path)
  }

  return {
    currentPath,
    navigateTo,
    params,
    query,
  }
}
