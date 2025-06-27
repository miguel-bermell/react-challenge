export const LabelInLine = ({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) => (
  <p>
    <span className="font-semibold">{label}:</span> {children || 'N/A'}
  </p>
);
