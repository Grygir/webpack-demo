mkdir -p vendor/oro && \
mkdir -p public/bundles && \
ln -sf `pwd`/../../package/platform vendor/oro/platform && \
ln -sf `pwd`/vendor/oro/platform/src/Oro/Bundles/CustomBundle/Resources/public public/bundles/orocustom && \
ln -sf `pwd`/vendor/oro/platform/src/Oro/Bundles/FilterBundle/Resources/public public/bundles/orofilter && \
ln -sf `pwd`/vendor/oro/platform/src/Oro/Bundles/UIBundle/Resources/public public/bundles/oroui
