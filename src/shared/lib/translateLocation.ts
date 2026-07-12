// Change url for local server - avoid CORS problems
export const translateLocation = (location: string): string => {
  if (!import.meta.env.DEV) {
    return location
  }

  return (new URL(location)).pathname
}