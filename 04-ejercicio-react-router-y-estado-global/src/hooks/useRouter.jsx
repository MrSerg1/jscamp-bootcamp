import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

export function useRouter() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  function navigateTo(path) {
    navigate(path)
  }

  return {
    currentPath,
    navigateTo,
  }
}
