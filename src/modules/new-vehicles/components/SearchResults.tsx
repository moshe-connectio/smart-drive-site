'use client';

import Link from 'next/link';
import type { TrimLevelFullInfo } from '../types';
import { formatMoney, toMonthly } from '../lib/searchUtils';

interface SearchResultsProps {
  visibleResults: TrimLevelFullInfo[];
  remaining: number;
  pageSize: number;
  onLoadMore: () => void;
}

export function SearchResults({
  visibleResults,
  remaining,
  pageSize,
  onLoadMore,
}: SearchResultsProps) {
  return (
    <>
      <ul className="home-search-results" role="list">
        {visibleResults.map((trim) => {
          const href = `/new-vehicles/${trim.manufacturer_slug}/${trim.model_slug}`;
          const monthly = toMonthly(trim.monthly_payment);

          return (
            <li key={trim.id} className="home-search-result">
              <Link href={href} className="home-search-result-link">
                <div className="home-search-result-media">
                  {trim.model_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={trim.model_image}
                      alt={`${trim.manufacturer_name} ${trim.model_name_he || trim.model_name}`}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="home-search-result-media-fallback"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      >
                        <path
                          d="M5 17h14M5 17l1.5-5h11L19 17M7 17v2M17 17v2M8 12V8h8v4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="home-search-result-body">
                  <p className="home-search-result-mfr">
                    {trim.manufacturer_name}
                  </p>
                  <h3 className="home-search-result-title">
                    {trim.model_name_he || trim.model_name}
                  </h3>
                  <p className="home-search-result-trim">{trim.name}</p>
                </div>

                <div className="home-search-result-price">
                  {monthly != null ? (
                    <>
                      <span className="home-search-result-price-label">
                        החזר חודשי
                      </span>
                      <span className="home-search-result-price-value">
                        {formatMoney(monthly)}
                        <small>/ חודש</small>
                      </span>
                    </>
                  ) : (
                    <span className="home-search-result-price-empty">
                      לבירור החזר חודשי
                    </span>
                  )}
                  <span
                    className="home-search-result-cta"
                    aria-hidden="true"
                  >
                    צפו במפרט
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5" />
                      <path d="M12 19l-7-7 7-7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {remaining > 0 && (
        <div className="home-search-load-more-wrap">
          <button
            type="button"
            className="home-search-load-more"
            onClick={onLoadMore}
          >
            טען עוד {Math.min(remaining, pageSize)} רכבים
            <span className="home-search-load-more-meta">
              ({remaining} נוספים תואמים)
            </span>
          </button>
        </div>
      )}
    </>
  );
}
