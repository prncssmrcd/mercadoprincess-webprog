import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  createArticle,
  deleteArticle,
  fetchArticles,
  mapArticleFromApi,
  updateArticle,
} from '../../services/ArticleService.js';

const blankForm = {
  name: '',
  title: '',
  imageUrl: '',
  content: [],
  isActive: true,
};

const truncate = (text, max) => {
  const value = String(text ?? '').trim();
  return value.length <= max ? value : `${value.slice(0, max)}...`;
};

function DashArticlesPage() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Mercado Princess Dashboard - Articles Management

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const loadArticles = async () => {
    try {
      setLoading(true);
      setApiError('');
      const { data } = await fetchArticles();
      const list = data?.articles ?? [];
      setArticles(
        list.map((article) => ({
          ...mapArticleFromApi(article),
          id: article._id || article.id || article.name,
        })),
      );
    } catch (error) {
      console.error('Error fetching articles:', error);
      setApiError('Unable to load articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        !searchQuery ||
        article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        !filterStatus ||
        (filterStatus === 'active' ? article.isActive : !article.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [articles, searchQuery, filterStatus]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name?.trim()) newErrors.name = 'Article slug is required';
    if (!form.title?.trim()) newErrors.title = 'Title is required';
    if (!form.imageUrl?.trim()) newErrors.imageUrl = 'Image URL is required';
    if (!form.content?.length) newErrors.content = 'At least one content block is required';
    return newErrors;
  };

  const openModal = (article = null) => {
    if (article) {
      setForm({
        ...article,
        content: Array.isArray(article.content) ? [...article.content] : [],
      });
      setModal({ open: true, id: article.id });
    } else {
      setForm(blankForm);
      setModal({ open: true, id: null });
    }
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm(blankForm);
    setErrors({});
  };

  const saveArticle = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setApiError('');
      if (modal.id) {
        await updateArticle(modal.id, form);
      } else {
        await createArticle(form);
      }
      await loadArticles();
      closeModal();
    } catch (error) {
      console.error('Error saving article:', error);
      setApiError('Failed to save article. Please try again.');
    }
  };

  const removeArticle = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        setApiError('');
        await deleteArticle(id);
        await loadArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
        setApiError('Failed to delete article. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontFamily: 'Poppins, system-ui', fontSize: 40, fontWeight: 600, color: '#4c4038', letterSpacing: '-1px', mb: 1 }}>
          Articles
        </Typography>
        <Typography sx={{ color: '#6c5d52', fontSize: 16 }}>
          Manage skincare articles and content.
        </Typography>
      </Box>

      {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={3}>
        <TextField
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span style={{ color: '#6c5d52', fontWeight: 700 }}>Search</span>
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />
        <TextField
          select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ minWidth: 120 }}
          displayEmpty
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
        <Button variant="contained" onClick={() => openModal()} sx={{ backgroundColor: '#826a5f', '&:hover': { backgroundColor: '#6b5548' } }}>
          Add Article
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#826a5f' }}>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Slug</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Description</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ py: 5, textAlign: 'center', color: '#6c5d52' }}>
                  Loading skincare articles...
                </TableCell>
              </TableRow>
            ) : filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <TableRow key={article.id} hover>
                  <TableCell>{article.id}</TableCell>
                  <TableCell>{article.name}</TableCell>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{truncate(article.description || article.content?.[0], 70)}</TableCell>
                  <TableCell>
                    <Chip
                      label={article.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      color={article.isActive ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => openModal(article)}
                        sx={{ color: '#826a5f' }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => removeArticle(article.id)}
                        sx={{ color: '#b02a37' }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ py: 5, textAlign: 'center', color: '#6c5d52' }}>
                  No skincare articles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={modal.open} onClose={closeModal} fullScreen={fullScreen} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: '#4c4038', fontWeight: 600 }}>
          {modal.id ? 'Edit Article' : 'Add New Article'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Article Slug"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
              placeholder="e.g., skincare-routine"
            />
            <TextField
              fullWidth
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              error={!!errors.title}
              helperText={errors.title}
              placeholder="Article title"
            />
            <TextField
              fullWidth
              label="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              error={!!errors.imageUrl}
              helperText={errors.imageUrl}
              placeholder="https://..."
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Content (one per line)"
              value={form.content.join('\n')}
              onChange={(e) => setForm({ ...form, content: e.target.value.split('\n').filter((c) => c.trim()) })}
              error={!!errors.content}
              helperText={errors.content || 'Enter content paragraphs separated by newlines'}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={saveArticle} variant="contained" sx={{ backgroundColor: '#826a5f' }}>
            {modal.id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DashArticlesPage;
