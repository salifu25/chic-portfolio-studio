import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Upload, 
  Eye, 
  EyeOff, 
  Trash2, 
  Edit, 
  LogOut,
  Package,
  DollarSign,
  Image as ImageIcon,
  Settings,
  Loader2,
  Tag
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { collectionsApi, piecesApi, uploadApi, categoriesApi, Collection, CollectionPiece, Category } from '@/services/api';

// Mock data for fallback when API is unavailable
const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'Harmattan Elegance',
    description: 'Inspired by the golden hues of the Harmattan season',
    season: 'Fall/Winter',
    year: 2024,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pieces: [],
  },
  {
    id: '2',
    name: 'Coastal Dreams',
    description: 'Ocean-inspired collection featuring flowing silhouettes',
    season: 'Spring/Summer',
    year: 2025,
    isVisible: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pieces: [],
  },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [collections, setCollections] = useState<Collection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [pieces, setPieces] = useState<CollectionPiece[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPieces, setLoadingPieces] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Modal states
  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [isAddingPiece, setIsAddingPiece] = useState(false);
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [editingPiece, setEditingPiece] = useState<CollectionPiece | null>(null);
  
  // Form states
  const [newCollection, setNewCollection] = useState({ name: '', description: '', season: '', year: new Date().getFullYear(), coverImage: '', categoryId: '' });
  const [newPiece, setNewPiece] = useState({ name: '', price: 0, description: '', category: 'ready-to-wear' as const, image: '' });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch collections and categories on mount
  useEffect(() => {
    fetchCollections();
    fetchCategories();
  }, []);

  // Fetch pieces when collection is selected
  useEffect(() => {
    if (selectedCollection) {
      fetchPieces(selectedCollection);
    } else {
      setPieces([]);
    }
  }, [selectedCollection]);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const data = await collectionsApi.getAll();
      setCollections(data.length > 0 ? data : mockCollections);
    } catch (error) {
      console.error('Failed to fetch collections:', error);
      setCollections(mockCollections);
      toast({ title: 'Using offline data', description: 'Could not connect to server.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoriesApi.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setSaving(true);
    try {
      const category = await categoriesApi.create({ name: newCategoryName.trim() });
      setCategories(prev => [...prev, category]);
      setNewCategoryName('');
      toast({ title: 'Category created', description: `"${category.name}" has been added.` });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create category.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await categoriesApi.delete(categoryId);
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      toast({ title: 'Category deleted' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete category.', variant: 'destructive' });
    }
  };

  const fetchPieces = async (collectionId: string) => {
    setLoadingPieces(true);
    try {
      const data = await piecesApi.getByCollection(collectionId);
      setPieces(data);
    } catch (error) {
      console.error('Failed to fetch pieces:', error);
      setPieces([]);
    } finally {
      setLoadingPieces(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleCollectionVisibility = async (collectionId: string) => {
    const collection = collections.find(c => c.id === collectionId);
    if (!collection) return;
    
    try {
      await collectionsApi.toggleVisibility(collectionId, !collection.isVisible);
      setCollections(prev =>
        prev.map(c =>
          c.id === collectionId ? { ...c, isVisible: !c.isVisible } : c
        )
      );
      toast({ title: 'Collection updated', description: 'Visibility setting has been changed.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update visibility.', variant: 'destructive' });
    }
  };

  const togglePieceVisibility = async (pieceId: string) => {
    const piece = pieces.find(p => p.id === pieceId);
    if (!piece) return;
    
    try {
      await piecesApi.update(pieceId, { isVisible: !piece.isVisible });
      setPieces(prev =>
        prev.map(p =>
          p.id === pieceId ? { ...p, isVisible: !p.isVisible } : p
        )
      );
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update visibility.', variant: 'destructive' });
    }
  };

  const togglePriceVisibility = async (pieceId: string) => {
    const piece = pieces.find(p => p.id === pieceId);
    if (!piece) return;
    
    try {
      await piecesApi.updatePricing(pieceId, { price: parseFloat(piece.price || '0'), showPrice: !piece.showPrice });
      setPieces(prev =>
        prev.map(p =>
          p.id === pieceId ? { ...p, showPrice: !p.showPrice } : p
        )
      );
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update price visibility.', variant: 'destructive' });
    }
  };

  const toggleAvailability = async (pieceId: string) => {
    const piece = pieces.find(p => p.id === pieceId);
    if (!piece) return;
    
    try {
      await piecesApi.updateAvailability(pieceId, !piece.available);
      setPieces(prev =>
        prev.map(p =>
          p.id === pieceId ? { ...p, available: !p.available } : p
        )
      );
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update availability.', variant: 'destructive' });
    }
  };

  const handleAddCollection = async () => {
    setSaving(true);
    try {
      const collection = await collectionsApi.create({
        ...newCollection,
        isVisible: false,
      });
      setCollections(prev => [...prev, collection]);
      setNewCollection({ name: '', description: '', season: '', year: new Date().getFullYear(), coverImage: '', categoryId: '' });
      setIsAddingCollection(false);
      toast({ title: 'Collection created', description: `"${collection.name}" has been added.` });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create collection.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleCollectionCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const { url } = await uploadApi.uploadImage(file);
      if (isEditing && editingCollection) {
        setEditingCollection(prev => prev ? { ...prev, coverImage: url } : null);
      } else {
        setNewCollection(prev => ({ ...prev, coverImage: url }));
      }
      toast({ title: 'Image uploaded' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to upload image.', variant: 'destructive' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEditCollection = async () => {
    if (!editingCollection) return;
    setSaving(true);
    try {
      const updated = await collectionsApi.update(editingCollection.id, editingCollection);
      setCollections(prev =>
        prev.map(c => (c.id === editingCollection.id ? updated : c))
      );
      setEditingCollection(null);
      toast({ title: 'Collection updated', description: 'Changes have been saved.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update collection.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddPiece = async () => {
    if (!selectedCollection) return;
    setSaving(true);
    try {
      const piece = await piecesApi.create({
        collectionId: selectedCollection,
        name: newPiece.name,
        description: newPiece.description,
        price: newPiece.price.toString(),
        category: newPiece.category,
        showPrice: true,
        available: true,
        isVisible: true,
        image: newPiece.image || '/placeholder.svg',
      });
      setPieces(prev => [...prev, piece]);
      setNewPiece({ name: '', price: 0, description: '', category: 'ready-to-wear', image: '' });
      setIsAddingPiece(false);
      toast({ title: 'Piece added', description: `"${piece.name}" has been added to the collection.` });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add piece.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handlePieceImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const { url } = await uploadApi.uploadImage(file);
      if (isEditing && editingPiece) {
        setEditingPiece(prev => prev ? { ...prev, image: url } : null);
      } else {
        setNewPiece(prev => ({ ...prev, image: url }));
      }
      toast({ title: 'Image uploaded' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to upload image.', variant: 'destructive' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEditPiece = async () => {
    if (!editingPiece) return;
    setSaving(true);
    try {
      const updated = await piecesApi.update(editingPiece.id, editingPiece);
      setPieces(prev =>
        prev.map(p => (p.id === editingPiece.id ? updated : p))
      );
      setEditingPiece(null);
      toast({ title: 'Piece updated', description: 'Changes have been saved.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update piece.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCollection = async (collectionId: string) => {
    try {
      await collectionsApi.delete(collectionId);
      setCollections(prev => prev.filter(c => c.id !== collectionId));
      if (selectedCollection === collectionId) {
        setSelectedCollection(null);
        setPieces([]);
      }
      toast({ title: 'Collection deleted' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete collection.', variant: 'destructive' });
    }
  };

  const handleDeletePiece = async (pieceId: string) => {
    try {
      await piecesApi.delete(pieceId);
      setPieces(prev => prev.filter(p => p.id !== pieceId));
      toast({ title: 'Piece deleted' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete piece.', variant: 'destructive' });
    }
  };

  const handleImageUpload = async (pieceId: string, file: File) => {
    try {
      const { url } = await uploadApi.uploadImage(file);
      await piecesApi.update(pieceId, { image: url });
      setPieces(prev =>
        prev.map(p => (p.id === pieceId ? { ...p, image: url } : p))
      );
      toast({ title: 'Image uploaded' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to upload image.', variant: 'destructive' });
    }
  };

  const selectedCollectionData = collections.find(c => c.id === selectedCollection);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-2xl text-foreground">Designer Portal</h1>
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Collections List */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-foreground">Collections</h2>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsManagingCategories(true)}
                  >
                    <Tag className="w-4 h-4 mr-1" />
                    Categories
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsAddingCollection(true)}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    New
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {collections.map((collection) => (
                  <motion.div
                    key={collection.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedCollection(collection.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedCollection === collection.id
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{collection.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {collection.season} {collection.year}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {collection.isVisible ? (
                          <Eye className="w-4 h-4 text-accent" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Collection Details */}
          <div className="lg:col-span-2">
            {selectedCollectionData ? (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-2xl text-foreground">
                      {selectedCollectionData.name}
                    </h2>
                    <p className="text-muted-foreground">{selectedCollectionData.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Visible</span>
                      <Switch
                        checked={selectedCollectionData.isVisible}
                        onCheckedChange={() => toggleCollectionVisibility(selectedCollectionData.id)}
                      />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setEditingCollection(selectedCollectionData)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteCollection(selectedCollectionData.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Pieces */}
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium text-foreground">Pieces</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsAddingPiece(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Piece
                  </Button>
                </div>

                {loadingPieces ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-accent" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pieces.map((piece) => (
                      <motion.div
                        key={piece.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            {piece.image && piece.image !== '/placeholder.svg' ? (
                              <img src={piece.image} alt={piece.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-foreground">{piece.name}</h4>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setEditingPiece(piece)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeletePiece(piece.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                              {/* Price */}
                              <div>
                                <label className="text-xs text-muted-foreground block mb-1">
                                  Price (GH₵)
                                </label>
                                <Input
                                  type="number"
                                  value={piece.price || 0}
                                  className="h-8 text-sm"
                                  readOnly
                                />
                              </div>

                              {/* Show Price Toggle */}
                              <div className="flex flex-col justify-center">
                                <label className="text-xs text-muted-foreground block mb-1">
                                  Show Price
                                </label>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={piece.showPrice}
                                    onCheckedChange={() => togglePriceVisibility(piece.id)}
                                  />
                                  <DollarSign
                                    className={`w-4 h-4 ${
                                      piece.showPrice ? 'text-accent' : 'text-muted-foreground'
                                    }`}
                                  />
                                </div>
                              </div>

                              {/* Availability Toggle */}
                              <div className="flex flex-col justify-center">
                                <label className="text-xs text-muted-foreground block mb-1">
                                  Available
                                </label>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={piece.available}
                                    onCheckedChange={() => toggleAvailability(piece.id)}
                                  />
                                  <Package
                                    className={`w-4 h-4 ${
                                      piece.available ? 'text-accent' : 'text-muted-foreground'
                                    }`}
                                  />
                                </div>
                              </div>

                              {/* Visibility Toggle */}
                              <div className="flex flex-col justify-center">
                                <label className="text-xs text-muted-foreground block mb-1">
                                  Visible
                                </label>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={piece.isVisible}
                                    onCheckedChange={() => togglePieceVisibility(piece.id)}
                                  />
                                  {piece.isVisible ? (
                                    <Eye className="w-4 h-4 text-accent" />
                                  ) : (
                                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/*/!* Upload Section *!/*/}
                {/*<div className="mt-6 p-6 border-2 border-dashed border-border rounded-lg text-center">*/}
                {/*  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />*/}
                {/*  <p className="text-sm text-muted-foreground">*/}
                {/*    Drag and drop images here, or click to upload*/}
                {/*  </p>*/}
                {/*  <Button variant="outline" size="sm" className="mt-3">*/}
                {/*    Choose Files*/}
                {/*  </Button>*/}
                {/*</div>*/}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-display text-xl text-foreground mb-2">
                  Select a Collection
                </h2>
                <p className="text-muted-foreground">
                  Choose a collection from the list to manage its pieces, pricing, and visibility.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Collection Modal */}
      <Dialog open={isAddingCollection} onOpenChange={setIsAddingCollection}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Collection</DialogTitle>
            <DialogDescription>Create a new collection to organize your pieces.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={newCollection.name} onChange={e => setNewCollection(prev => ({ ...prev, name: e.target.value }))} placeholder="Collection name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={newCollection.description} onChange={e => setNewCollection(prev => ({ ...prev, description: e.target.value }))} placeholder="Describe the collection" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="season">Season</Label>
                <Input id="season" value={newCollection.season} onChange={e => setNewCollection(prev => ({ ...prev, season: e.target.value }))} placeholder="e.g. Fall/Winter" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" value={newCollection.year} onChange={e => setNewCollection(prev => ({ ...prev, year: parseInt(e.target.value) }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={newCollection.categoryId}
                onChange={e => setNewCollection(prev => ({ ...prev, categoryId: e.target.value }))}
                className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              >
                <option value="">Select a category</option>
                {categories.filter(c => c.id !== 'all').map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="flex items-center gap-4">
                {newCollection.coverImage ? (
                  <img src={newCollection.coverImage} alt="Cover preview" className="w-20 h-20 object-cover rounded-lg border border-border" />
                ) : (
                  <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center border border-border">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleCollectionCoverUpload(e, false)}
                    disabled={uploadingImage}
                    className="cursor-pointer"
                  />
                  {uploadingImage && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingCollection(false)}>Cancel</Button>
            <Button onClick={handleAddCollection} disabled={!newCollection.name || saving || uploadingImage}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Collection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Collection Modal */}
      <Dialog open={!!editingCollection} onOpenChange={() => setEditingCollection(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Collection</DialogTitle>
            <DialogDescription>Update collection details.</DialogDescription>
          </DialogHeader>
          {editingCollection && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" value={editingCollection.name} onChange={e => setEditingCollection(prev => prev ? { ...prev, name: e.target.value } : null)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  value={editingCollection.categoryId || ''}
                  onChange={e => setEditingCollection(prev => prev ? { ...prev, categoryId: e.target.value } : null)}
                  className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.filter(c => c.id !== 'all').map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" value={editingCollection.description} onChange={e => setEditingCollection(prev => prev ? { ...prev, description: e.target.value } : null)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-season">Season</Label>
                  <Input id="edit-season" value={editingCollection.season} onChange={e => setEditingCollection(prev => prev ? { ...prev, season: e.target.value } : null)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-year">Year</Label>
                  <Input id="edit-year" type="number" value={editingCollection.year} onChange={e => setEditingCollection(prev => prev ? { ...prev, year: parseInt(e.target.value) } : null)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="flex items-center gap-4">
                  {editingCollection.coverImage ? (
                    <img src={editingCollection.coverImage} alt="Cover preview" className="w-20 h-20 object-cover rounded-lg border border-border" />
                  ) : (
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center border border-border">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleCollectionCoverUpload(e, true)}
                      disabled={uploadingImage}
                      className="cursor-pointer"
                    />
                    {uploadingImage && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCollection(null)}>Cancel</Button>
            <Button onClick={handleEditCollection} disabled={saving || uploadingImage}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Piece Modal */}
      <Dialog open={isAddingPiece} onOpenChange={setIsAddingPiece}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Piece</DialogTitle>
            <DialogDescription>Add a new piece to this collection.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="piece-name">Name</Label>
              <Input id="piece-name" value={newPiece.name} onChange={e => setNewPiece(prev => ({ ...prev, name: e.target.value }))} placeholder="Piece name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="piece-description">Description</Label>
              <Textarea id="piece-description" value={newPiece.description} onChange={e => setNewPiece(prev => ({ ...prev, description: e.target.value }))} placeholder="Describe the piece" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="piece-price">Price (GH₵)</Label>
              <Input id="piece-price" type="number" value={newPiece.price} onChange={e => setNewPiece(prev => ({ ...prev, price: parseFloat(e.target.value) }))} />
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <div className="flex items-center gap-4">
                {newPiece.image ? (
                  <img src={newPiece.image} alt="Piece preview" className="w-20 h-20 object-cover rounded-lg border border-border" />
                ) : (
                  <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center border border-border">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePieceImageUpload(e, false)}
                    disabled={uploadingImage}
                    className="cursor-pointer"
                  />
                  {uploadingImage && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingPiece(false)}>Cancel</Button>
            <Button onClick={handleAddPiece} disabled={!newPiece.name || saving || uploadingImage}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Piece
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Piece Modal */}
      <Dialog open={!!editingPiece} onOpenChange={() => setEditingPiece(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Piece</DialogTitle>
            <DialogDescription>Update piece details.</DialogDescription>
          </DialogHeader>
          {editingPiece && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-piece-name">Name</Label>
                <Input id="edit-piece-name" value={editingPiece.name} onChange={e => setEditingPiece(prev => prev ? { ...prev, name: e.target.value } : null)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-piece-description">Description</Label>
                <Textarea id="edit-piece-description" value={editingPiece.description} onChange={e => setEditingPiece(prev => prev ? { ...prev, description: e.target.value } : null)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-piece-price">Price (GH₵)</Label>
                <Input id="edit-piece-price" type="number" value={editingPiece.price || 0} onChange={e => setEditingPiece(prev => prev ? { ...prev, price: e.target.value } : null)} />
              </div>
              <div className="space-y-2">
                <Label>Image</Label>
                <div className="flex items-center gap-4">
                  {editingPiece.image && editingPiece.image !== '/placeholder.svg' ? (
                    <img src={editingPiece.image} alt="Piece preview" className="w-20 h-20 object-cover rounded-lg border border-border" />
                  ) : (
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center border border-border">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePieceImageUpload(e, true)}
                      disabled={uploadingImage}
                      className="cursor-pointer"
                    />
                    {uploadingImage && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPiece(null)}>Cancel</Button>
            <Button onClick={handleEditPiece} disabled={saving || uploadingImage}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Categories Modal */}
      <Dialog open={isManagingCategories} onOpenChange={setIsManagingCategories}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
            <DialogDescription>Create and manage collection categories.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex gap-2">
              <Input
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
                placeholder="New category name"
                className="flex-1"
              />
              <Button onClick={handleAddCategory} disabled={!newCategoryName.trim() || saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {categories.filter(c => c.id !== 'all').map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="text-foreground">{category.name}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {categories.filter(c => c.id !== 'all').length === 0 && (
                <p className="text-center text-muted-foreground py-4">No categories yet. Add one above.</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsManagingCategories(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
