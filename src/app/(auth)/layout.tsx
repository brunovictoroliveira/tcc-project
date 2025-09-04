export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {children}
    </section>
  );
}
