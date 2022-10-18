import { Typography } from '@mui/material';
import { FC } from 'react';
import Character from './Character';

interface Props {
  relation?: string;
  title: string;
}

const CharacterRelation: FC<Props> = ({ relation, title }) => (relation ? (
  <>
    <br />
    <Typography>
      {title}
      :
    </Typography>
    <Character character={relation} displayNameOnly />
  </>
) : null);

export default CharacterRelation;
