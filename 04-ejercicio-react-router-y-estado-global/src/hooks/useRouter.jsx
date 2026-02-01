import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router'

export function useRouter() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const params = useParams()

  function navigateTo(path) {
    navigate(path)
  }

  return {
    currentPath,
    navigateTo,
    params,
  }
}
