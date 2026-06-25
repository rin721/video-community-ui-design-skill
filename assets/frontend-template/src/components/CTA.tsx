import { Button } from "./Button";

type CTAProps = {
  onSuccess: () => void;
};

export function CTA({ onSuccess }: CTAProps) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div>
        <p className="eyebrow">Next step</p>
        <h2 id="cta-title">Keep the system reusable before adding real content.</h2>
        <p>
          Swap fixtures, update tokens, and re-run validation before treating any generated page as
          production-ready.
        </p>
      </div>
      <Button onClick={onSuccess}>Show success</Button>
    </section>
  );
}
