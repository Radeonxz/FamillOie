export interface Board {
  id: string;
  user: string;
  icon: string;
  title: string;
  description: string;
  position: number;
  favorite: boolean;
  favoritePosition: number;
}

export interface BoardUpdateProps {
  icon?: string;
  title?: string;
  description?: string;
  favorite?: boolean;
}

export interface BoardUpdatePositionProps {
  boards: Board[];
}

export interface BoardUpdateFavoritePositionProps
  extends BoardUpdatePositionProps {}
