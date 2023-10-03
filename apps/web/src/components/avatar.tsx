interface Props {
  size?: number;
  username: string;
}

export const Avatar: React.FC<Props> = ({
  size = 64,
  username,
}) => {
  return (
    <img
      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${username}`}
      alt="avatar"
      width={size}
      height={size}
    />
  )
}
