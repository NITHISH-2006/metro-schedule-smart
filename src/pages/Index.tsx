// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="text-center max-w-md p-8">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Welcome to KMRL AI</h1>
        <p className="text-xl text-muted-foreground mb-6">
          This is a demo page. Please go to the{" "}
          <a href="/" className="text-primary underline hover:text-primary/80">
            login page
          </a>{" "}
          to access the dashboard.
        </p>
      </div>
    </div>
  );
};

export default Index;
