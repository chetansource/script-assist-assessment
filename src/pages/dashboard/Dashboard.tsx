import { useState,useEffect } from 'react';
import { Table, Title, Container, Button,TextInput,Grid,Center } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/app.store';
import { useSearchParams, Link } from 'react-router-dom';

const fetchCharacters = async () => {
  const response = await fetch('https://swapi.dev/api/people/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

   // Extract the part of the email before the '@' symbol
   const username = user?.email.split('@')[0];

   // Use React Query to fetch data
   const { data, isLoading, error } = useQuery(['characters'], fetchCharacters);

   useEffect(() => {
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  }, [searchTerm, setSearchParams]);

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error fetching data</div>;

    // Filter characters based on search term
  const filteredCharacters = data.results.filter((character: any) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container
      style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Grid align="center" justify="space-between" mb="md">
        <Grid.Col span="auto">
          <Title style={{ color: '#3D4C7E' }}>Welcome, {username}</Title>
        </Grid.Col>
        <Grid.Col span="content">
          <Button onClick={logout} style={{ backgroundColor: '#3D4C7E' }}>
            Logout
          </Button>
        </Grid.Col>
      </Grid>

      
      <Title align="center" mb="md" style={{ color: '#3D4C7E' }}>
        Star Wars Characters
      </Title>

      <Center>
      <TextInput 
        placeholder="Search characters..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem', width: '50%' }}
      />
      </Center>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Hair Color</th>
            <th>Skin Color</th>
            <th>Eye Color</th>
            <th>Birth Year</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {filteredCharacters.map((character: any) => (
            <tr key={character.name}>
              <td>
          <Link to={`/character/${character.url.split('/').slice(-2, -1)[0]}`}>
            {character.name}
          </Link>
        </td>
              <td>{character.height}</td>
              <td>{character.mass}</td>
              <td>{character.hair_color}</td>
              <td>{character.skin_color}</td>
              <td>{character.eye_color}</td>
              <td>{character.birth_year}</td>
              <td>{character.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;