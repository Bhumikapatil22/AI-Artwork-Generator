import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import dotenv from 'dotenv';
dotenv.config();
import { 
  Navbar, 
  Tabs, 
  PromptInput, 
  GenerationOptions, 
  ImageDisplay, 
  CommunityImages,
  // FormField,
  FAQSection
} from '../components';
import { getRandomPrompt } from '../utils';
import { Post, FormData } from '../types';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'creations'>('explore');
  const [form, setForm] = useState<FormData>({
    name: '',
    prompt: '',
    photos: [],
    selectedStyle: 'basic'
  });
  
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[] | null>(null);
  const [myPosts, setMyPosts] = useState<Post[] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchedResults, setSearchedResults] = useState<Post[] | null>(null);
  // const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded?.name && !form.name) {
          setForm(prev => ({ ...prev, name: decoded.name }));
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_KEY}post`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
          if (form.name) {
            setMyPosts(result.data.filter((post: Post) => post.user.name === form.name));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [form.name]);
  


  const generateImages = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        // setShowNameInput(true);
  
        // ✅ Style-based prefix map
        const stylePromptPrefixMap: Record<string, string> = {
          'logo': 'create a logo of ',
          '3d-illustration': 'create a 3d illustration of ',
          'sketch': 'create a sketch of ',
          'abstract': 'create an abstract art of ',
          'ghibli': 'create a ghibli-style image of ',
          'basic': '',
          '3d-cartoon': 'create a 3d cartoon of '
        };
  
        const selectedStyle = form.selectedStyle || 'basic';
        const prefix = stylePromptPrefixMap[selectedStyle];
        const finalPrompt = `${prefix}${form.prompt.trim()}`;
        console.log(finalPrompt);
        const HUGGING_FACE_API_KEY = import.meta.env.REACT_APP_HUGGING_FACE_API_KEY;
        const promises = Array(4)
          .fill(null)
          .map(() =>
            fetch(`${import.meta.env.VITE_API_KEY}imgGenerate`, {
              method: 'POST',
              headers: {
               
                'Authorization': `${HUGGING_FACE_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ prompt: finalPrompt }),
            })
          );
  
        const responses = await Promise.all(promises);
        const datas = await Promise.all(responses.map(res => res.json()));
        const generatedPhotos = datas.map(data => `data:image/jpeg;base64,${data.photo}`);
  
        setForm({ ...form, photos: generatedPhotos });
      } catch (error) {
        console.error(error);
        alert('Error generating images. Please try again.');
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const postsToSearch = activeTab === 'explore' ? allPosts : myPosts;
        if (!postsToSearch) return;
        
        const searchResult = postsToSearch.filter(
          (item) =>
            item.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleStyleSelect = (style: string) => {
    setForm({ ...form, selectedStyle: style });
  };

  const handleSubmit = async () => {
    if (form.prompt && form.photos.length > 0 && form.name) {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_KEY}post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            prompt: form.prompt,
            photo: form.photos[0],
          }),
        });

        await response.json();
        
        // Refresh posts
        const postsResponse = await fetch(`${import.meta.env.VITE_API_KEY}post`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (postsResponse.ok) {
          const result = await postsResponse.json();
          setAllPosts(result.data.reverse());
          if (form.name) {
            setMyPosts(result.data.filter((post: Post) => post.user.name === form.name));
          }
        }
        
        setActiveTab('creations');
      } catch (error) {
        console.log(error);
        console.error(error);
        alert('Error sharing with community');
      } finally {
        setLoading(false);
        setForm({
          ...form,
          prompt: '',
          photos: []
        });
        // setShowNameInput(false);
      }
    } else {
      if (!form.name) {
        alert('Please enter your name');
      } else {
        alert('Please generate images first');
      }
    }
  };

  return (
    <div className="bg-[#1f1f1f] text-white min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'explore' ? (
          <>
            {/* {showNameInput && (
              <div className="max-w-md mx-auto mb-6">
                <FormField
                  labelName="Your Name"
                  type="text"
                  name="name"
                  placeholder="Ex. John Doe"
                  value={form.name}
                  handleChange={handleChange}
                />
              </div>
            )} */}
            
            <GenerationOptions 
              selectedStyle={form.selectedStyle || 'basic'} 
              setSelectedStyle={handleStyleSelect} 
            />

            <PromptInput 
              form={form}
              handleChange={handleChange}
              handleSurpriseMe={handleSurpriseMe}
              generateImages={generateImages}
              isGenerating={generatingImg}
            />
            
            <ImageDisplay 
              photos={form.photos}
              isGenerating={generatingImg}
              previewImage=""
              onShare={handleSubmit}
              isSharing={loading}
            />

            <CommunityImages 
              posts={allPosts}
              searchText={searchText}
              handleSearchChange={handleSearchChange}
              searchResults={searchedResults}
              isLoading={loading}
            />
            
            <FAQSection />
          </>
        ) : (
          <CommunityImages 
            posts={myPosts}
            searchText={searchText}
            handleSearchChange={handleSearchChange}
            searchResults={searchedResults}
            isLoading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default Home;