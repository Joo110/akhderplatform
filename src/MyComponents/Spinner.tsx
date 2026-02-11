const Spinner = () => {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <figure
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "block",
            width: "100px",
            height: "100px",
            border: "8px solid rgba(0, 111, 60, 0.2)",
            borderTop: "8px solid #006F3C",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
          }}
        />

        <figcaption
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 600,
            color: "#006F3C",
          }}
        >
          Loading
        </figcaption>
      </figure>

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </main>
  );
};

export default Spinner;
