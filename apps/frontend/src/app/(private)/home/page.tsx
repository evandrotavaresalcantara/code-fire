import { ActiveCustomersChart } from "@/components/charts/activeCustomersChart";

export default async function HomePage() {
  return (
    <div className="flex flex-wrap w-full container">
      <div>
        <ActiveCustomersChart />
      </div>
    </div>
  );
}
