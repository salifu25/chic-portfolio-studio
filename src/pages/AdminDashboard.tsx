import { useState } from 'react';
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
  Settings
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

interface Piece {
  id: string;
  name: string;
  price: number;
  showPrice: boolean;
  isAvailable: boolean;
  isVisible: boolean;
  image: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  season: string;
  year: number;
  isVisible: boolean;
  pieces: Piece[];
}

// Mock data for development - will be replaced with API calls
const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'Harmattan Elegance',
    description: 'Inspired by the golden hues of the Harmattan season',
    season: 'Fall/Winter',
    year: 2024,
    isVisible: true,
    pieces: [
      {
        id: 'p1',
        name: 'Golden Draped Gown',
        price: 8500,
        showPrice: true,
        isAvailable: true,
        isVisible: true,
        image: '/placeholder.svg',
      },
      {
        id: 'p2',
        name: 'Kente Fusion Blazer',
        price: 4200,
        showPrice: true,
        isAvailable: false,
        isVisible: true,
        image: '/placeholder.svg',
      },
    ],
  },
  {
    id: '2',
    name: 'Coastal Dreams',
    description: 'Ocean-inspired collection featuring flowing silhouettes',
    season: 'Spring/Summer',
    year: 2025,
    isVisible: false,
    pieces: [
      {
        id: 'p3',
        name: 'Wave Silk Dress',
        price: 6800,
        showPrice: false,
        isAvailable: true,
        isVisible: true,
        image: '/placeholder.svg',
      },
    ],
  },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [collections, setCollections] = useState<Collection[]>(mockCollections);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  
  // Modal states
  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [isAddingPiece, setIsAddingPiece] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [editingPiece, setEditingPiece] = useState<Piece | null>(null);
  
  // Form states
  const [newCollection, setNewCollection] = useState({ name: '', description: '', season: '', year: new Date().getFullYear() });
  const [newPiece, setNewPiece] = useState({ name: '', price: 0 });

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleCollectionVisibility = (collectionId: string) => {
    setCollections(prev =>
      prev.map(c =>
        c.id === collectionId ? { ...c, isVisible: !c.isVisible } : c
      )
    );
    toast({
      title: 'Collection updated',
      description: 'Visibility setting has been changed.',
    });
  };

  const togglePieceVisibility = (collectionId: string, pieceId: string) => {
    setCollections(prev =>
      prev.map(c =>
        c.id === collectionId
          ? {
              ...c,
              pieces: c.pieces.map(p =>
                p.id === pieceId ? { ...p, isVisible: !p.isVisible } : p
              ),
            }
          : c
      )
    );
  };

  const togglePriceVisibility = (collectionId: string, pieceId: string) => {
    setCollections(prev =>
      prev.map(c =>
        c.id === collectionId
          ? {
              ...c,
              pieces: c.pieces.map(p =>
                p.id === pieceId ? { ...p, showPrice: !p.showPrice } : p
              ),
            }
          : c
      )
    );
  };

  const toggleAvailability = (collectionId: string, pieceId: string) => {
    setCollections(prev =>
      prev.map(c =>
        c.id === collectionId
          ? {
              ...c,
              pieces: c.pieces.map(p =>
                p.id === pieceId ? { ...p, isAvailable: !p.isAvailable } : p
              ),
            }
          : c
      )
    );
  };

  const handleAddCollection = () => {
    const collection: Collection = {
      id: Date.now().toString(),
      ...newCollection,
      isVisible: false,
      pieces: [],
    };
    setCollections(prev => [...prev, collection]);
    setNewCollection({ name: '', description: '', season: '', year: new Date().getFullYear() });
    setIsAddingCollection(false);
    toast({ title: 'Collection created', description: `"${collection.name}" has been added.` });
  };

  const handleEditCollection = () => {
    if (!editingCollection) return;
    setCollections(prev =>
      prev.map(c => (c.id === editingCollection.id ? editingCollection : c))
    );
    setEditingCollection(null);
    toast({ title: 'Collection updated', description: 'Changes have been saved.' });
  };

  const handleAddPiece = () => {
    if (!selectedCollection) return;
    const piece: Piece = {
      id: Date.now().toString(),
      name: newPiece.name,
      price: newPiece.price,
      showPrice: true,
      isAvailable: true,
      isVisible: true,
      image: '/placeholder.svg',
    };
    setCollections(prev =>
      prev.map(c =>
        c.id === selectedCollection ? { ...c, pieces: [...c.pieces, piece] } : c
      )
    );
    setNewPiece({ name: '', price: 0 });
    setIsAddingPiece(false);
    toast({ title: 'Piece added', description: `"${piece.name}" has been added to the collection.` });
  };

  const handleEditPiece = () => {
    if (!editingPiece || !selectedCollection) return;
    setCollections(prev =>
      prev.map(c =>
        c.id === selectedCollection
          ? { ...c, pieces: c.pieces.map(p => (p.id === editingPiece.id ? editingPiece : p)) }
          : c
      )
    );
    setEditingPiece(null);
    toast({ title: 'Piece updated', description: 'Changes have been saved.' });
  };

  const handleDeleteCollection = (collectionId: string) => {
    setCollections(prev => prev.filter(c => c.id !== collectionId));
    if (selectedCollection === collectionId) setSelectedCollection(null);
    toast({ title: 'Collection deleted' });
  };

  const handleDeletePiece = (pieceId: string) => {
    if (!selectedCollection) return;
    setCollections(prev =>
      prev.map(c =>
        c.id === selectedCollection
          ? { ...c, pieces: c.pieces.filter(p => p.id !== pieceId) }
          : c
      )
    );
    toast({ title: 'Piece deleted' });
  };

  const selectedCollectionData = collections.find(c => c.id === selectedCollection);

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
                <Button
                  size="sm"
                  onClick={() => setIsAddingCollection(true)}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New
                </Button>
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
                          {collection.season} {collection.year} • {collection.pieces.length} pieces
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

                <div className="space-y-4">
                  {selectedCollectionData.pieces.map((piece) => (
                    <motion.div
                      key={piece.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
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
                                value={piece.price}
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
                                  onCheckedChange={() =>
                                    togglePriceVisibility(selectedCollectionData.id, piece.id)
                                  }
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
                                  checked={piece.isAvailable}
                                  onCheckedChange={() =>
                                    toggleAvailability(selectedCollectionData.id, piece.id)
                                  }
                                />
                                <Package
                                  className={`w-4 h-4 ${
                                    piece.isAvailable ? 'text-accent' : 'text-muted-foreground'
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
                                  onCheckedChange={() =>
                                    togglePieceVisibility(selectedCollectionData.id, piece.id)
                                  }
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

                {/* Upload Section */}
                <div className="mt-6 p-6 border-2 border-dashed border-border rounded-lg text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop images here, or click to upload
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Choose Files
                  </Button>
                </div>
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

        {/* API Integration Note */}
        <div className="mt-8 p-4 bg-muted/50 border border-border rounded-lg">
          <h3 className="font-medium text-foreground mb-2">Spring Boot API Integration</h3>
          <p className="text-sm text-muted-foreground">
            This dashboard uses placeholder API calls. Connect your Spring Boot backend by updating
            the <code className="bg-muted px-1 rounded">src/services/api.ts</code> file with your
            actual endpoints. Set <code className="bg-muted px-1 rounded">VITE_API_URL</code> in
            your environment to configure the base URL.
          </p>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingCollection(false)}>Cancel</Button>
            <Button onClick={handleAddCollection} disabled={!newCollection.name}>Create Collection</Button>
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
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCollection(null)}>Cancel</Button>
            <Button onClick={handleEditCollection}>Save Changes</Button>
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
              <Label htmlFor="piece-price">Price (GH₵)</Label>
              <Input id="piece-price" type="number" value={newPiece.price} onChange={e => setNewPiece(prev => ({ ...prev, price: parseFloat(e.target.value) }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingPiece(false)}>Cancel</Button>
            <Button onClick={handleAddPiece} disabled={!newPiece.name}>Add Piece</Button>
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
                <Label htmlFor="edit-piece-price">Price (GH₵)</Label>
                <Input id="edit-piece-price" type="number" value={editingPiece.price} onChange={e => setEditingPiece(prev => prev ? { ...prev, price: parseFloat(e.target.value) } : null)} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPiece(null)}>Cancel</Button>
            <Button onClick={handleEditPiece}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}