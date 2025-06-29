import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Menu, Bell, ChevronRight, Settings, User, 
  FileText, Coins, MessageSquare, Megaphone, Headphones, Award, 
  Eye, EyeOff
} from 'lucide-react';
import Switch from 'react-switch';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-black shadow-sm dark:shadow-gray-800 z-50">
      <div className="hidden sm:block">
        <div className="max-w-[1200px] mx-auto px-4 h-20">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-10">
              <Link to="/" className="text-2xl font-extrabold text-gray-900 dark:text-white">Stairway</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;