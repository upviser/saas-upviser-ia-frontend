"use client"
import { IInfo } from "@/interfaces"
import { SubscribePage } from "."

export const Subscribe = ({ info, style, tenantId }: { info: IInfo, style?: any, tenantId: string }) => {

  return (
    <SubscribePage info={info} style={style} tenantId={tenantId} />
  )
}