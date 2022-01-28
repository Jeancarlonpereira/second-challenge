import { useEffect, useState, SetStateAction } from 'react';
import { GenreResponseProps } from '../App';
import { Button } from '../components/Button';
import { api } from '../services/api';

interface sideBarPropsInterface {
  selectedGenreId: number;
  handleClickButton: React.Dispatch<SetStateAction<number>>;
}

export function SideBar( {selectedGenreId,handleClickButton } : sideBarPropsInterface) {

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

  </nav>
  )
}