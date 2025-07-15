import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Footer from '../components/Footer';
import {
  Navbar,
  Tabs,
  PromptInput,
  GenerationOptions,
  ImageDisplay,
  CommunityImages,
  FAQSection,
  FormField
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
        const response = await fetch(`${import.meta.env.VITE_API_KEY}/post`, {
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
    if (!form.prompt) {
      alert('Please enter a prompt');
      return;
    }
    if (!form.name) {
      alert('Please enter your name');
      return;
    }

    setGeneratingImg(true);

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

    const API_URL = import.meta.env.VITE_API_URL;
    const HF_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

    try {
      const requests = Array(4).fill(null).map(() =>
        fetch(`${API_URL}/imgGenerate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${HF_API_KEY}`,
          },
          body: JSON.stringify({ prompt: finalPrompt }),
        })
      );

      const responses = await Promise.all(requests);

      const failed = responses.find(res => !res.ok);
      if (failed) {
        const errorData = await failed.json();
        console.error('Generation error response:', errorData);
        alert(errorData.message || 'Failed to generate image');
        return;
      }

      const data = await Promise.all(responses.map(res => res.json()));
      const generatedPhotos = data.map(d => `data:image/jpeg;base64,${d.photo}`);
      setForm(prev => ({ ...prev, photos: generatedPhotos }));
    } catch (error: any) {
      console.error('Image generation failed:', error);
      alert(error.message || 'Something went wrong during image generation.');
    } finally {
      setGeneratingImg(false);
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

  const handleSubmit = async (selectedPhotoIndex: number = 0) => {
    if (!form.prompt || form.photos.length === 0 || !form.name) {
      alert('Please complete all fields and generate images first.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          name: form.name,
          prompt: form.prompt,
          photo: form.photos[selectedPhotoIndex],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to share post');
      }

      const postsResponse = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (postsResponse.ok) {
        const result = await postsResponse.json();
        setAllPosts(result.data.reverse());
        setMyPosts(result.data.filter((post: Post) => post.user.name === form.name));
      }

      setActiveTab('creations');
      alert('Successfully shared with community!');
    } catch (error: any) {
      console.error('Sharing error:', error);
      alert(error.message || 'Error sharing image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1f1f1f] text-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {!form.name && (
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
        )}


        {activeTab === 'explore' ? (
          <>
            <div className="w-full px-4 md:px-8">
              <div className="flex flex-col items-center text-center max-w-screen-md mx-auto">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="mt-4 w-full">
                  <GenerationOptions
                    selectedStyle={form.selectedStyle || 'basic'}
                    setSelectedStyle={handleStyleSelect}
                  />
                </div>
              </div>
            </div>


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

            {/* <CommunityImages
              posts={allPosts}
              searchText={searchText}
              handleSearchChange={handleSearchChange}
              searchResults={searchedResults}
              isLoading={loading}
            /> */}

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
      <Footer />
    </div>
  );
};

export default Home;
