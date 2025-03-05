import { Box, Divider, Paper, Typography } from "@mui/material";

export interface ArticleSectionProps {
  title: string;
  content: string;
}

export interface ArticleProps {
  title: string;
  sections: ArticleSectionProps[];
}

export const Article: React.FC<ArticleProps> = ({ title, sections }) => {
  return (
    <>
      <Paper sx={{ px: 4, py: 3, boxShadow: 2 }} elevation={0}>
        <Typography
          component='h1'
          sx={{
            fontFamily: "Lexend, sans-serif",
            fontSize: 22,
            fontWeight: 600,
            mb: 2,
          }}
        >
          {title}
        </Typography>

        <Divider />
        <Box sx={{ py: 1 }}>
          {sections.map((section) => (
            <ArticleSection key={section.title} {...section} />
          ))}
        </Box>
      </Paper>
    </>
  );
};

export const ArticleSection: React.FC<ArticleSectionProps> = ({
  title,
  content,
}) => {
  return (
    <section>
      <Typography
        component='h2'
        sx={{
          fontFamily: "Lexend, sans-serif",
          fontSize: 15,
          fontWeight: 600,
          py: 1,
        }}
      >
        {title}
      </Typography>

      <Typography
        component='p'
        sx={{
          fontFamily: "Lexend, sans-serif",
          fontSize: { xs: 14, md: 15 },
          textAlign: "justify",
          pb: 1,
        }}
        whiteSpace={"break-spaces"}
      >
        {content}
      </Typography>
    </section>
  );
};
