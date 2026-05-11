
export default function GoogleAuthBtn() {
  return (
    <div className="space-y-4">
      <button
        type="button"
        className="w-full h-11 rounded-lg border border-line text-sm bg-secondary text-main font-medium hover:bg-foreground transition-colors"
      >
        <img src="/auth/goggle.png" alt="Google" />
        Continue with Google
      </button>
      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        <span>or continue with email</span>
        <span className="h-px flex-1 bg-line" />
      </div>
    </div>
  );
}
