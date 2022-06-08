import { CSS, css } from "@nextui-org/react"

export default function useCSS<T extends Record<string, unknown>>(
  styles: Record<keyof T, CSS>
) {
  return Object.fromEntries(
    Object.entries(styles).map(([key, style]) => [key, css(style)().className])
  ) as Record<keyof T, string>
}
