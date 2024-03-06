import "./Tile.css";

interface Props {
  image?: string;
  number: number;
  highlights: boolean;
}

export default function Tile({ number, image, highlights }: Props) {
  // Alter the classname based on the available moves by the piece being clicked on
  const className: string = [
    "tile",
    number % 2 === 0 && "black-tile",
    number % 2 !== 0 && "white-tile",
    highlights && "tile-highlight",
  ]
    // Evaluate the elements in the array and determines which are true and returns them
    .filter(Boolean) 
    // Then join the class attributes together
    .join(" ");

  return (
    <div className={className}>
      {/* Make the image a background so when clicked it is not attached to image */}
      {/* Also only render the piece if not null */}
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="chess-piece"
        ></div>
      )}
    </div>
  );
}
