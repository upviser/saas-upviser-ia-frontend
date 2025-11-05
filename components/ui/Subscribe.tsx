"use client"
import { IInfo, IPage } from "@/interfaces"
import { SubscribePage } from "."

export const Subscribe = ({ info, style, tenantId, page }: { info: IInfo, style?: any, tenantId: string, page?: any }) => {

  return (
    <SubscribePage info={info} style={style} tenantId={tenantId} page={page} />
  )
}