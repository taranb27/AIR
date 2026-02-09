export default function PanelWrapper({
    children,
    z = "z-10",
  }: {
    children: React.ReactNode;
    z?: string;
  }) {
    return (
      <div
        className={`sticky top-0 w-screen bg-[#0a0a0a] ${z}
          px-3 sm:px-6 lg:px-8
          pt-3 pb-3 sm:pt-6 sm:pb-6 lg:pt-8 lg:pb-8`}
      >
        <div className="h-full w-full rounded-[32px] sm:rounded-[44px] bg-[#f6f6f6] overflow-hidden">
          {children}
        </div>
      </div>
    );
  }
  