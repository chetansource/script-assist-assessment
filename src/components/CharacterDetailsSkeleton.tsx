import { Grid, Skeleton, Card, Container } from "@mantine/core";
export const CharacterDetailsSkeleton = () => {
  return (
    <Container
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Title Skeleton */}
      <Skeleton height={40} width="60%" radius="md" mb="xl" />

      {/* Card Skeleton */}
      <Card shadow="lg" padding="lg" radius="md" withBorder>
        <Grid gutter="xl">
          {/* Left Column (General Information) */}
          <Grid.Col span={12} md={6}>
            {/* Image Skeleton */}
            <Card.Section>
              <Skeleton height={200} radius="md" />
            </Card.Section>

            {/* General Information Skeleton */}
            <Skeleton height={30} width="50%" radius="md" mt="md" />
            <Skeleton height={16} width="80%" radius="md" mt="sm" />
            <Skeleton height={16} width="70%" radius="md" mt="sm" />
            <Skeleton height={16} width="75%" radius="md" mt="sm" />
            <Skeleton height={16} width="65%" radius="md" mt="sm" />
            <Skeleton height={16} width="70%" radius="md" mt="sm" />
            <Skeleton height={16} width="60%" radius="md" mt="sm" />
            <Skeleton height={16} width="70%" radius="md" mt="sm" />
          </Grid.Col>

          {/* Right Column (Homeworld) */}
          <Grid.Col span={12} md={6}>
            {/* Homeworld Skeleton */}
            <Skeleton height={30} width="50%" radius="md" mt="md" />
            <Skeleton height={16} width="80%" radius="md" mt="sm" />
            <Skeleton height={16} width="70%" radius="md" mt="sm" />
            <Skeleton height={16} width="75%" radius="md" mt="sm" />
            <Skeleton height={16} width="65%" radius="md" mt="sm" />
          </Grid.Col>
        </Grid>

        {/* Films Skeleton */}
        <Skeleton height={30} width="50%" radius="md" mt="xl" />
        <Skeleton height={16} width="80%" radius="md" mt="sm" />
        <Skeleton height={16} width="70%" radius="md" mt="sm" />
        <Skeleton height={16} width="75%" radius="md" mt="sm" />

        {/* Starships Skeleton */}
        <Skeleton height={30} width="50%" radius="md" mt="xl" />
        <Skeleton height={16} width="80%" radius="md" mt="sm" />
        <Skeleton height={16} width="70%" radius="md" mt="sm" />
        <Skeleton height={16} width="75%" radius="md" mt="sm" />
      </Card>
    </Container>
  );
};
