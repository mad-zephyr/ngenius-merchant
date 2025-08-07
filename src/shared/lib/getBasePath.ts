export const getBasePath = () => {
  const base =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_API_PROD || process.env.NEXT_PUBLIC_API_PROD
      : process.env.NEXT_API_DEV || process.env.NEXT_PUBLIC_API_DEV

  const isBuildPhase = process.env.IS_BUILD === 'true'

  if (!base) {
    throw new Error('🚨 Missing API base URL! Check your .env file.')
  }

  return isBuildPhase ? process.env.NEXT_PUBLIC_API_PROD : base
}
