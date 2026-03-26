import SyncLoaderSteps from "../features/Synchronization/components/SyncLoaderSteps";

export default function MaintainancePage() {
  return (
    <div><SyncLoaderSteps loading={true} setloading={()=>undefined}  /></div>
  )
}
