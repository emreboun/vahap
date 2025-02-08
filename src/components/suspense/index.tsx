import { Loading } from "@/components/loading";
import { Suspense as ReactSuspense } from "react";
interface SuspenseProps {
  children?: React.ReactNode | undefined;

  /** A fallback react tree to show when a Suspense child (like React.lazy) suspends */
  fallback?: React.ReactNode;
}
export const Suspense: React.FC<SuspenseProps> = ({
  children,
  fallback = <Loading />,
}) => {
  return <ReactSuspense fallback={fallback}>{children}</ReactSuspense>;
};
