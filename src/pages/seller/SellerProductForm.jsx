import React, { useState, useEffect } from "react";
import axios from '../../utils/api';
import { toast } from "react-toastify";
import {
  Box, TextField, Button, FormControl, InputLabel, Select, MenuItem,
  CircularProgress, Typography, Grid, Switch, FormControlLabel,
  Card, CardMedia, IconButton, Alert, Checkbox
} from "@mui/material";
import { AddAPhoto as AddAPhotoIcon, Delete as DeleteIcon } from "@mui/icons-material";

const SellerProductForm = ({ onSuccess, product, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    mrp: 0,
    stock: 0,
    brand: "",
    category: "",
    is_active: true,
    is_preorder: false,
    preorder_deposit: 0,
    available_on: "",
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get("/catalog/categories/")
      .then((res) => {
        if (Array.isArray(res.data)) setCategories(res.data);
        else if (res.data.results) setCategories(res.data.results);
        else setCategoryError("Invalid response from categories API.");
      })
      .catch(() => setCategoryError("Failed to load categories."))
      .finally(() => setLoadingCategories(false));

    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price || 0,
        mrp: product.mrp || 0,
        stock: product.stock || 0,
        brand: product.brand || "",
        category: product.category?.id || "",
        is_active: product.is_active,
        is_preorder: product.is_preorder || false,
        preorder_deposit: product.preorder_deposit || 0,
        available_on: product.available_on || "",
      });
      setExistingImages(product.images || []);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked :
               ["price","mrp","stock","preorder_deposit"].includes(name) ? parseFloat(value) || 0 :
               value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) setImages(prev => [...prev, ...Array.from(e.target.files)]);
  };

  const removeNewImage = (idx) => setImages(prev => prev.filter((_, i) => i !== idx));
  const removeExistingImage = (id) => toast.info("Delete image feature coming soon.");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validation
      if (form.is_preorder && (!form.preorder_deposit || form.preorder_deposit <= 0)) {
        toast.error("Please set a valid deposit amount for pre-order.");
        setSubmitting(false);
        return;
      }
      if (form.is_preorder && !form.available_on) {
        toast.error("Please set the estimated availability date for pre-order.");
        setSubmitting(false);
        return;
      }
      if (!form.is_preorder && (!form.stock || form.stock <= 0)) {
        toast.error("Stock must be greater than 0 for standard products.");
        setSubmitting(false);
        return;
      }

      let response;
      if (product) {
        response = await axios.patch(`/catalog/seller/products/${product.id}/`, form);
        toast.success("Product updated successfully!");
      } else {
        response = await axios.post("/catalog/seller/products/", form);
        toast.success("Product added successfully!");
      }

      const productId = response.data.id;

      // Upload images
      if (images.length > 0) {
        const imgData = new FormData();
        imgData.append("product", productId);
        images.forEach(img => imgData.append("images", img));
        await axios.post("/catalog/seller/upload-image/", imgData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (onSuccess) onSuccess(response.data);

      if (!product) {
        setForm(prev => ({
          ...prev,
          title: "", description: "", price: 0, mrp: 0, stock: 0, brand: "", category: "",
          is_active: true, is_preorder: false, preorder_deposit: 0, available_on: ""
        }));
        setImages([]);
      }

    } catch (err) {
      console.error("Failed to submit product:", err);
      toast.error("Failed to submit product. Check your fields and try again.");
    } finally { setSubmitting(false); }
  };

  return (
    <Card sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>{product ? "Update Product" : "Add New Product"}</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField name="title" label="Product Title" value={form.title} onChange={handleChange} fullWidth required/>
          </Grid>
          <Grid item xs={12}>
            <TextField name="description" label="Description" value={form.description} onChange={handleChange} multiline rows={4} fullWidth/>
          </Grid>
          <Grid item xs={6}>
            <TextField name="price" label="Price" type="number" value={form.price} onChange={handleChange} fullWidth required inputProps={{min:0}}/>
          </Grid>
          <Grid item xs={6}>
            <TextField name="mrp" label="MRP" type="number" value={form.mrp} onChange={handleChange} fullWidth inputProps={{min:0}}/>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="stock"
              label={form.is_preorder ? "Initial Stock" : "Stock Quantity"}
              type="number" value={form.stock} onChange={handleChange}
              fullWidth required={!form.is_preorder} disabled={form.is_preorder} inputProps={{min:0}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField name="brand" label="Brand" value={form.brand} onChange={handleChange} fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              {loadingCategories ? <CircularProgress size={24} sx={{ my: 2 }}/> :
               categoryError ? <Alert severity="error">{categoryError}</Alert> :
               <Select name="category" value={form.category} onChange={handleChange}>
                 <MenuItem value=""><em>None</em></MenuItem>
                 {categories.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
               </Select>}
            </FormControl>
          </Grid>

          <Grid item xs={12}><Typography variant="subtitle1" sx={{ mt:1, borderTop:'1px solid #eee', pt:1 }}>Pre-Booking</Typography></Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel control={<Checkbox checked={form.is_preorder} onChange={handleChange} name="is_preorder"/>} label="Enable Pre-order"/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField name="preorder_deposit" label="Deposit Amount (₹)" type="number"
              value={form.preorder_deposit} onChange={handleChange} fullWidth
              required={form.is_preorder} disabled={!form.is_preorder} inputProps={{min:0}}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField name="available_on" label="Available Date" type="date"
              value={form.available_on} onChange={handleChange} fullWidth
              required={form.is_preorder} disabled={!form.is_preorder} InputLabelProps={{shrink:true}}/>
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth startIcon={<AddAPhotoIcon/>}>
              Upload Images
              <input type="file" multiple hidden onChange={handleImageChange}/>
            </Button>
            {existingImages.length>0 && <Box sx={{display:'flex', flexWrap:'wrap', gap:2, mt:2}}>
              {existingImages.map(img=>(
                <Card key={img.id} sx={{width:100,height:100,position:'relative'}}>
                  <CardMedia component="img" image={img.image} alt="Existing" sx={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  <IconButton size="small" sx={{position:'absolute',top:0,right:0,color:'white'}} onClick={()=>removeExistingImage(img.id)}><DeleteIcon/></IconButton>
                </Card>
              ))}
            </Box>}
            {images.length>0 && <Box sx={{display:'flex', flexWrap:'wrap', gap:2, mt:2}}>
              {images.map((img,idx)=>(
                <Card key={idx} sx={{width:100,height:100,position:'relative'}}>
                  <CardMedia component="img" image={URL.createObjectURL(img)} alt={`Preview ${idx}`} sx={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  <IconButton size="small" sx={{position:'absolute',top:0,right:0,color:'white'}} onClick={()=>removeNewImage(idx)}><DeleteIcon/></IconButton>
                </Card>
              ))}
            </Box>}
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel control={<Switch checked={form.is_active} onChange={handleChange} name="is_active"/>} label="Active"/>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth size="large" disabled={submitting}>
              {submitting ? <CircularProgress size={24}/> : product ? "Update Product" : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default SellerProductForm;
