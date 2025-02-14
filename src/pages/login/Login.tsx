import { TextInput, Button, Title, Container, Paper, Grid, Space } from '@mantine/core';
import { useAuthStore } from '../../store/app.store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    login(email, password,navigate);
  };

  return (
    <Container
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
    }}
  >
    <Paper
      shadow="sm"
      p="xl"
      style={{
        width: '100%',
        maxWidth: '400px', // Fixed width for the form
        borderRadius: '8px', // Rounded corners
        backgroundColor: '#FBFBFC'
      }}
    >
      <Title align="center" mb="md">
        Login
      </Title>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button fullWidth type="submit">
              Login
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  </Container>
  );
};

export default Login;