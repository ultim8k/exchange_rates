import "/node_modules/flag-icons/css/flag-icons.min.css";

interface FlagIconProps {
  flagIdentifier?: string | null;
  name: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ flagIdentifier, name }) => {
  if (!flagIdentifier) {
    return null;
  }

  const fullClass = `fi fi-${flagIdentifier}`;
  return <span title={name} className={fullClass}></span>;
};
