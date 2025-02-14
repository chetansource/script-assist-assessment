
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Text, Title, Container, List, Grid, Skeleton, Image } from '@mantine/core';

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>(); // Get character ID from the URL
  const [character, setCharacter] = useState<any>(null);
  const [homeworld, setHomeworld] = useState<any>(null);
  const [films, setFilms] = useState<any[]>([]);
  const [starships, setStarships] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch character details
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCharacter(data);

        // Fetch homeworld details
        const homeworldResponse = await fetch(data.homeworld);
        const homeworldData = await homeworldResponse.json();
        setHomeworld(homeworldData);

        // Fetch films
        const filmsData = await Promise.all(
            data.films.map(async (filmUrl: string) => {
              const filmResponse = await fetch(filmUrl);
              return filmResponse.json();
            })
          );
          setFilms(filmsData);
  
          // Fetch starships
          const starshipsData = await Promise.all(
            data.starships.map(async (starshipUrl: string) => {
              const starshipResponse = await fetch(starshipUrl);
              return starshipResponse.json();
            })
          );
          setStarships(starshipsData);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (isLoading) {
    return (
      <Container>
        <Skeleton height={50} width="100%" mb="md" />
        <Skeleton height={20} width="100%" mb="md" />
        <Skeleton height={20} width="100%" mb="md" />
      </Container>
    );
  }

  if (!character) {
    return <Text>Character not found</Text>;
  }

  return (
    <Container
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <Title align="center" mb="md" style={{ color: '#3D4C7E' }}>
        {character.name}
      </Title>

      <Card shadow="lg" padding="lg" radius="md" withBorder>
        <Grid gutter="xl">
          <Grid.Col span={12} md={6}>
            <Card.Section>
              <Image
                src={`https://picsum.photos/400/300?random=${id}`} // Placeholder image
                alt={character.name}
                height={200}
                fit="cover"
              />
            </Card.Section>
            <Text size="lg" weight={500} mt="md">
              General Information
            </Text>
            <List spacing="sm" mt="sm">
              <List.Item>
                <Text><strong>Height:</strong> {character.height}</Text>
              </List.Item>
              <List.Item>
                <Text><strong>Mass:</strong> {character.mass}</Text>
              </List.Item>
              <List.Item>
                <Text><strong>Hair Color:</strong> {character.hair_color}</Text>
              </List.Item>
              <List.Item>
                <Text><strong>Skin Color:</strong> {character.skin_color}</Text>
              </List.Item>
              <List.Item>
                <Text><strong>Eye Color:</strong> {character.eye_color}</Text>
              </List.Item>
              <List.Item>
                <Text><strong>Birth Year:</strong> {character.birth_year}</Text>
              </List.Item>
              <List.Item>
                <Text><strong>Gender:</strong> {character.gender}</Text>
              </List.Item>
            </List>
          </Grid.Col>

          <Grid.Col span={12} md={6}>
            <Text size="lg" weight={500}>
              Homeworld
            </Text>
            {homeworld ? (
              <List spacing="sm" mt="sm">
                <List.Item>
                  <Text><strong>Name:</strong> {homeworld.name}</Text>
                </List.Item>
                <List.Item>
                  <Text><strong>Climate:</strong> {homeworld.climate}</Text>
                </List.Item>
                <List.Item>
                  <Text><strong>Terrain:</strong> {homeworld.terrain}</Text>
                </List.Item>
                <List.Item>
                  <Text><strong>Population:</strong> {homeworld.population}</Text>
                </List.Item>
              </List>
            ) : (
              <Text>Loading homeworld...</Text>
            )}
          </Grid.Col>
        </Grid>

        {/* Enriched Data: Films */}
        <Text size="lg" weight={500} mt="xl">
          Films
        </Text>
        <List spacing="sm" mt="sm">
          {films.length > 0 ? (
            films.map((film) => (
              <List.Item key={film.url}>
                <Text><strong>{film.title}</strong> (Released: {film.release_date})</Text>
              </List.Item>
            ))
          ) : (
            <Text>No films found.</Text>
          )}
        </List>

        {/* Enriched Data: Starships */}
        <Text size="lg" weight={500} mt="xl">
          Starships
        </Text>
        <List spacing="sm" mt="sm">
          {starships.length > 0 ? (
            starships.map((starship) => (
              <List.Item key={starship.url}>
                <Text><strong>{starship.name}</strong> (Model: {starship.model})</Text>
              </List.Item>
            ))
          ) : (
            <Text>No starships found.</Text>
          )}
        </List>

        
      </Card>
    </Container>
  );
};