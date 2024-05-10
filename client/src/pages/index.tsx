import { createFileRoute } from '@tanstack/react-router'
import {Page} from "@/components/atoms/page.tsx";

export const Route = createFileRoute('/')({
  component: () => <Page />
})