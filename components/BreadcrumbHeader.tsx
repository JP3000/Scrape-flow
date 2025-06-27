"use client";

import { usePathname } from 'next/navigation';
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from './ui/breadcrumb';
import MODERN_BROWSERSLIST_TARGET from 'next/dist/shared/lib/modern-browserslist-target';
import { MobileSidebar } from './Sidebar';

function BreadcrumbHeader() {
    const pathName = usePathname();
    const paths = pathName === "/" ? [""] : pathName?.split("/");
  return (
    <div className='flex items-center flex-start'>
      <MobileSidebar />
        <Breadcrumb>
          <BreadcrumbList>
            {paths.map((path, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink className='capitalize' href={`/${path}`}>
                      {path === "" ? "Home" : path}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
    </div>
  )
}

export default BreadcrumbHeader