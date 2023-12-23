// components/Card.tsx
type CardProps = {
  title: string;
  content: string;
  link: string;
};

const Card = ({ title, content, link }: CardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="font-heading text-lg mb-2">{title}</h3>
      <p className="text-textSecondary mb-4">{content}</p>
      <a href={link} className="text-primary hover:underline">
        Read more
      </a>
    </div>
  );
};

export default Card;
