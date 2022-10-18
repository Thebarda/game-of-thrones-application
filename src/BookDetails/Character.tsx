import { IconButton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { includes, T } from 'ramda';
import { FC, memo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ListDetails, { isNotDefined, removeEmptyValues } from '../shared/ListDetails';
import { elementFetch } from '../shared/elementFetch';
import { Character } from '../shared/models';
import House from './House';
import CharacterRelation from './CharacterRelation';
import { starCharacterDerivedAtom, starredCharactersAtom } from '../shared/atoms';

interface Props {
  character: string;
  displayNameOnly?: boolean;
}

const CharacterComponent: FC<Props> = ({ character, displayNameOnly = false }) => {
  const { data } = useQuery({
    queryKey: ['character', character],
    queryFn: () => elementFetch<Character>(character),
    suspense: true,
  });

  const starredCharacters = useAtomValue(starredCharactersAtom);
  const starCharacter = useSetAtom(starCharacterDerivedAtom);

  if (displayNameOnly) {
    return <Typography>{data?.name}</Typography>;
  }

  const isStarred = includes(character, starredCharacters);

  return (
    <>
      <IconButton size="small" onClick={() => starCharacter(character)}>
        {isStarred ? <StarIcon fontSize="small" color="primary" /> : <StarBorderIcon fontSize="small" />}
      </IconButton>
      <Typography variant="h6">{data?.name}</Typography>
      <Typography>
        Gender:
        {data?.gender}
      </Typography>
      <br />
      {data?.culture && (
      <Typography>
        Culture:
        {data?.culture}
      </Typography>
      )}
      <ListDetails list={data?.titles} title="Titles" />
      <ListDetails list={data?.aliases} title="Aliases" />
      <ListDetails list={data?.playedBy} title="Played by" />
      {isNotDefined(data?.allegiances) && (
        <>
          <br />
          <Typography>Houses:</Typography>
          {
            removeEmptyValues(data?.allegiances || []).map((allegiance) => <House house={allegiance} />)
          }
        </>
      )}
      <CharacterRelation title="Father" relation={data?.father} />
      <CharacterRelation title="Mother" relation={data?.mother} />
      <CharacterRelation title="Spouse" relation={data?.spouse} />
    </>
  );
};

export default memo(CharacterComponent, T);
