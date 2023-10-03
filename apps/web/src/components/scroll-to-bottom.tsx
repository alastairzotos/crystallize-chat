import React, { CSSProperties, useEffect, useRef } from "react";

interface Props {
  style?: CSSProperties;
}

export const ScrollToBottom: React.FC<React.PropsWithChildren<Props>> = ({ children, style }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [children])

  return (
    <div style={style}>
      {children}

      <div ref={endRef} />
    </div>
  )
}
